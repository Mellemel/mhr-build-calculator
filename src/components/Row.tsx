interface RowProps {
  children?: React.ReactNode,
  className?: string,
}

function Row(props: RowProps) {
  return (
    <div className="row-container pure-g">
      {props.children}
    </div>
  );
};

export default Row;
