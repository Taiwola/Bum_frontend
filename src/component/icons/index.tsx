import React from 'react';
import BarChart from './bar_chart';
import Calendar from './calendar';
import CheckCircled from './check_circled';
import Chip from './chip';
import ClipboardIcon from './clipboardIcon';
import Compass from './compass';
import Database from './database';
import Flag from './flag';
import FunnelPagePlaceholder from './funnel-page-placeholder';
import Headphone from './headphone';
import Home from './home';
import Info from './info';
import Link from './link';
import Lock from './lock';
import Mail from './mail';
import Messages from './messages';
import Notification from './notification';
import Payment from './payment';
import Person from './person';
import Pipelines from './pipelines';
import PluraCategory from './plura-category';
import Power from './power';
import Receipt from './receipt';
import Settings from './settings';
import Send from './send';
import Shield from './shield';
import Star from './star';
import Tune from './tune';
import VideoRecorder from './video_recorder';
import Wallet from './wallet';
import Warning from './warning';


type Props = {
  icon: string
}

const IconImages = ({ icon }: Props) => {
  let iconElement = null;

  switch (icon) {
    case 'bar_chart':
      iconElement = <BarChart />;
      break;
    case 'calendar':
      iconElement = <Calendar />;
      break;
    case 'check_circled':
      iconElement = <CheckCircled />;
      break;
    case 'chip':
      iconElement = <Chip />;
      break;
    case 'clipboardIcon':
      iconElement = <ClipboardIcon />;
      break;
    case 'compass':
      iconElement = <Compass />;
      break;
    case 'database':
      iconElement = <Database />;
      break;
    case 'flag':
      iconElement = <Flag />;
      break;
    case 'funnel-page-placeholder':
      iconElement = <FunnelPagePlaceholder />;
      break;
    case 'headphone':
      iconElement = <Headphone />;
      break;
    case 'home':
      iconElement = <Home />;
      break;
    case 'info':
      iconElement = <Info />;
      break;
    case 'link':
      iconElement = <Link />;
      break;
    case 'lock':
      iconElement = <Lock />;
      break;
    case 'mail':
      iconElement = <Mail />;
      break;
    case 'messages':
      iconElement = <Messages />;
      break;
    case 'notification':
      iconElement = <Notification />;
      break;
    case 'payment':
      iconElement = <Payment />;
      break;
    case 'person':
      iconElement = <Person />;
      break;
    case 'pipelines':
      iconElement = <Pipelines />;
      break;
    case 'category':
      iconElement = <PluraCategory />;
      break;
    case 'power':
      iconElement = <Power />;
      break;
    case 'receipt':
      iconElement = <Receipt />;
      break;
    case 'settings':
      iconElement = <Settings />;
      break;
    case 'send':
      iconElement = <Send />;
      break;
    case 'shield':
      iconElement = <Shield />;
      break;
    case 'star':
      iconElement = <Star />;
      break;
    case 'tune':
      iconElement = <Tune />;
      break;
    case 'video_recorder':
      iconElement = <VideoRecorder />;
      break;
    case 'wallet':
      iconElement = <Wallet />;
      break;
    case 'warning':
      iconElement = <Warning />;
      break;
    default:
      iconElement = null;
  }

  return <div>{iconElement}</div>;
};


export default IconImages;