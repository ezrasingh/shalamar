export function preventDefault(callback: () => void) {
  return (event?: React.FormEvent) => {
    event?.preventDefault();
    callback();
  };
}

export function hexColorToInt(color: string): number {
  return parseInt(color.slice(1), 16);
}
