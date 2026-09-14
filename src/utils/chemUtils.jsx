import React from 'react';

/**
 * Formats a chemical formula string with subscript JSX elements.
 * Example: "C21H26O3" -> React nodes with <sub> tags.
 * Also handles isotopes like "D3", charges, and parentheses.
 * @param {string} formula
 * @returns {React.ReactNode}
 */
export function formatMolecularFormula(formula) {
  if (!formula || typeof formula !== 'string') return '';

  // Split by numbers so we can wrap them in <sub>
  const parts = formula.split(/(\d+)/);
  return (
    <span className="font-mono tracking-wide">
      {parts.map((part, index) => {
        if (/^\d+$/.test(part)) {
          return <sub key={index} className="text-[0.8em] font-normal leading-none">{part}</sub>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

/**
 * Copies text to the user's clipboard and returns a promise.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  if (!text) return false;
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers / iframe contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}
