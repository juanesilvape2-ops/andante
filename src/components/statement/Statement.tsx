export interface StatementProps {
  children: string;
}

export function Statement({ children }: StatementProps) {
  return (
    <div className="av-shell">
      <div className="av-statement">
        <p>{children}</p>
      </div>
    </div>
  );
}
