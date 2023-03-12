import { PropsWithChildren } from "react";
import Row from "./Row";

interface GearRowProps extends PropsWithChildren {
  image: string;
}

function GearRow(props: GearRowProps) {
  return (
    <Row>
      <div className="pure-u-1-4">
        <img className="img-base-wearable" src={props.image} alt="Stock Weapon" />
      </div>
      <div className="pure-u-3-4">
      <input type="text" />
        {props.children}
      </div>
    </Row>
  )
}

export default GearRow;