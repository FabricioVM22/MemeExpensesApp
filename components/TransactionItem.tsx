/**
 * @file Renders a single transaction item with swipe-to-delete functionality.
 */

import React, { useRef, useState } from 'react';
import { Transaction, Category } from '../types';
import { DynamicCategoryIcon, TrashIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';

interface TransactionItemProps {
  transaction: Transaction;
  getCategory: (id: string | undefined) => Category | undefined;
  onDelete: (id: string) => void;
  activeSwipedItemId: string | null;
  setActiveSwipedItemId: (id: string | null) => void;
}

// FIX: Change to React.FC to correctly handle props like 'key' which is managed by React.
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, getCategory, onDelete, activeSwipedItemId, setActiveSwipedItemId }) => {
  const { t } = useLocalization();
  const itemRef = useRef<HTMLDivElement>(null);
  const [swipeX, setSwipeX] = useState(0);
  const startX = useRef(0);
  const isSwiped = activeSwipedItemId === transaction.id;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    if (activeSwipedItemId && activeSwipedItemId !== transaction.id) {
      setActiveSwipedItemId(null);
    }
    if (itemRef.current) {
        itemRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    if (diff < 0 && diff > -100) { // Only allow left swipe up to 100px
      setSwipeX(diff);
    }
  };

  const handleTouchEnd = () => {
    if (itemRef.current) {
        itemRef.current.style.transition = 'transform 0.3s ease-out';
    }
    if (swipeX < -50) { // Threshold to activate swipe
      setSwipeX(-80);
      setActiveSwipedItemId(transaction.id);
    } else {
      setSwipeX(0);
      if (isSwiped) {
        setActiveSwipedItemId(null);
      }
    }
    startX.current = 0;
  };

  const handleDelete = () => {
    onDelete(transaction.id);
    setSwipeX(0);
    setActiveSwipedItemId(null);
  };
  
  // Close swipe when another item is swiped
  React.useEffect(() => {
    if (activeSwipedItemId !== transaction.id) {
        setSwipeX(0);
    }
  }, [activeSwipedItemId, transaction.id]);

  const category = transaction.type === 'expense' ? getCategory(transaction.categoryId) : undefined;
  const isIncome = transaction.type === 'income';

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div 
        className="absolute top-0 right-0 bottom-0 w-20 bg-danger flex items-center justify-center"
        style={{ transform: `translateX(${isSwiped ? 0 : 100}%)`, transition: 'transform 0.3s ease-out' }}
      >
        <button onClick={handleDelete} className="text-white p-4">
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
      <div
        ref={itemRef}
        className="flex items-center p-2 rounded-lg bg-surface transition-transform w-full"
        style={{ transform: `translateX(${swipeX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: isIncome ? 'hsl(var(--success) / 0.1)' : `${category?.color}20`, color: isIncome ? 'hsl(var(--success))' : category?.color }}>
          <DynamicCategoryIcon name={isIncome ? 'trending-up' : category?.icon || 'tag'} className="w-5 h-5" />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="font-medium truncate">{transaction.description}</p>
          <p className="text-sm text-text-secondary">{new Date(transaction.date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
        </div>
        <div className={`ml-3 font-semibold ${isIncome ? 'text-success' : 'text-danger'}`}>
          {isIncome ? '+' : '-'}{t('currencySymbol')}{transaction.amount.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;