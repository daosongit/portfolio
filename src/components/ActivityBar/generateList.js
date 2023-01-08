import { ImFilesEmpty as IcoFiles } from 'react-icons/im';
import { RxAvatar as IcoAvatar } from 'react-icons/rx';
import { SlSettings as IcoSetting } from 'react-icons/sl';

export function generateList(iconCl, hintCl) {
  const icons = [{ Explore: <IcoFiles /> }, { About: <IcoAvatar /> }, { Settings: <IcoSetting /> }];
  let arrLi = [];
  icons.forEach((itm) => {
    const [text, icon] = Object.entries(itm)[0];
    arrLi.push(
      <li key={text}>
        <span onClick={(e) => console.log(e)} className={iconCl}>
          {icon}
        </span>
        <div className={hintCl}>
          <span>{text}</span>
        </div>
      </li>,
    );
  });
  return arrLi;
}
