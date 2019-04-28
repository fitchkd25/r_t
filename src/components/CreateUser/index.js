import React from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    return (
      <div>
        <ReactTypeformEmbed
          autoOpen={true}
          url="https://kirbyjrfitch.typeform.com/to/nh3QQU"
          hideHeaders
          hideFooter
          buttonText="Go!"
          style={{ top: 100 }}
          ref={tf => {
            this.typeformEmbed = tf;
          }}
        />
      </div>
    );
  }
}

export default CreateUser;