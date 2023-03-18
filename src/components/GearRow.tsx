import { PropsWithChildren } from "react";
import Row from "./Row";

interface GearRowProps extends PropsWithChildren {
  title: string;
  image: string;
}

function GearRow(props: GearRowProps) {
  return (
    <Row>
      <div className="pure-u">
        <img className="img-base-wearable" src={props.image} alt="Stock Weapon" />
      </div>
      <div className="pure-u">
        <h3>{props.title}</h3>
        {props.children}
      </div>
    </Row>
  )
}

export default GearRow;