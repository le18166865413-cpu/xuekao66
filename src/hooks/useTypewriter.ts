import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 4000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentText = texts[currentIndex];

  useEffect(() => {
    if (texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText.length === currentText.length) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentIndex, texts, currentText, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}
