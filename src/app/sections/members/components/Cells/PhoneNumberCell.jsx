import {Cell} from 'fixed-data-table';
import { convertStringToPhoneFormat } from '../../utils/convertStringToPhoneFormat.jsx';

export default class PhoneNumberCell extends React.Component {

  render() {
    const {
      phoneNumber
    } = this.props;

    return (
      <Cell>
        {convertStringToPhoneFormat(phoneNumber)}
      </Cell>
    );
  }
}
