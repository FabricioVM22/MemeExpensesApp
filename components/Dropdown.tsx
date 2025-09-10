/**
 * @file Renders a custom, styleable dropdown component.
 * Replaces the native <select> element for a consistent look and feel.
 */
import React, { useState, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';
import { useClickOutside } from '../hooks/useClickOutside';

/** Defines the shape of an option for the dropdown. */
export interface DropdownOption {
  value: string;
  label: string;
}

/** Props for the Dropdown component. */
interface DropdownProps {
  /** The list of options to display. */
  options: DropdownOption[];
  /** The currently selected value. */
  selectedValue: string;
  /** Callback function when a new option is selected. */
  onSelect: (value: string) => void;
  /** The ID of the label associated with this dropdown for accessibility. */
  labelId: string;
}

/**
 * A custom dropdown/select component.
 * @param {DropdownProps} props - The props for the component.
 * @returns The rendered dropdown component.
 */
export default function Dropdown({ options, selectedValue, onSelect, labelId }: DropdownProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside of it
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedLabel = options.find(option => option.value === selectedValue)?.label || '';

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full bg-input border-transparent rounded-md p-2 flex justify-between items-center text-left focus:ring-2 focus:ring-primary focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId}
      >
        <span>{selectedLabel}</span>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 text-text-secondary" /> : <ChevronDownIcon className="w-5 h-5 text-text-secondary" />}
      </button>

      {isOpen && (
        <ul
          className="absolute z-20 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
          style={{ animation: 'fade-in 0.1s ease-out' }}
          role="listbox"
          aria-labelledby={labelId}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={`p-2 m-1 rounded-md cursor-pointer hover:bg-border/50 ${selectedValue === option.value ? 'bg-primary/10 text-primary font-semibold' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
