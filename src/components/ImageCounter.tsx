interface ImageCounterProps {
  icon: React.ReactNode;
  counter?: number;
}

function ImageCounter(props: ImageCounterProps) {
  return (
    <div className="icon-container pure-g">
      {props.icon}
      <span>{props.counter ?? 'N/A'}</span>
    </div>
  )
}
export default ImageCounter;