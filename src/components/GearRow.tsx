import { PropsWithChildren } from "react";
import Row from "./Row";
import Decoration from "./Decoration";

interface GearRowProps extends PropsWithChildren {
  title: string;
  image: string;
  decorations?: any[];
}

function GearRow(props: GearRowProps) {
  return (
    <Row>
      <div className="pure-u">
        <img className="img-base-wearable" src={props.image} alt="Stock Weapon" />
      </div>
      <div className="pure-u">
        <h3 className="title">{props.title}</h3>
        {props.children}
      </div>
      <div className="pure-u">
        {renderDecorations(props.decorations)}
      </div>
    </Row>
  )
}



function renderDecorations(decorations: any[] | undefined) {
  return (
    <div>
      {decorations?.map((deco) => <Decoration />)}
    </div>
  )
}

export default GearRow;