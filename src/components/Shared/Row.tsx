import { PropsWithChildren } from 'react';

function Row(props: PropsWithChildren) {
  return (
    <div className="pure-g">
      {props.children}
    </div>
  );
};

export default Row;
