import { ReactComponent as DecoSlotOne } from '../images/decorations/deco_slot1.svg'
import ImageContainer from './ImageCounter'

function Decoration() {
  return <ImageContainer icon={<DecoSlotOne className='icon-container-svg' />} />
}

export default Decoration;