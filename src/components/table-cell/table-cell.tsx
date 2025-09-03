import { useEffect, useState, memo } from 'react';
import styles from '../table-row/table-row.module.scss';

const animationTimer = 1100;

const TableCell = memo(function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    setIsAnimated(true);
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, animationTimer);
    return () => clearTimeout(timer);
  }, [children]);
  return (
    <td className={isAnimated ? styles.animation : ''}>{children ?? 'N/A'}</td>
  );
});

export { TableCell };
