interface ImageCounterProps {
  icon: React.ReactNode;
  counter?: string;
}

function ImageContainer(props: ImageCounterProps) {
  return (
    <div className="icon-container pure-g">
      {props.icon}
      <span><small>{props.counter ?? 'N/A'}</small></span>
    </div>
  )
}
export default ImageContainer;