import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Row, Col } from 'antd';
import { LogoIcon } from '../Logo';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  const handleLoginOut = () => {
    console.log('out');
  };

  return (
    <div>

      <Menu mode="horizontal">
        <Menu.Item key="1" style={{ marginTop: '10px' }} >
          <NavLink to='/'><LogoIcon width={35} height={35} /></NavLink>
        </Menu.Item>

        <Menu.Item key="2" >
          <NavLink to='/'>Поиск</NavLink>
        </Menu.Item>

        <Menu.Item key="3" >
          <NavLink to='/favorites'>Избранное</NavLink>
        </Menu.Item>

        <Menu.Item key="4" onClick={handleLoginOut} style={{ marginLeft: '250px' }}>
          <NavLink to='/login'>Выйти</NavLink>
        </Menu.Item>

      </Menu>

    </div >
  );
};

export default Header;
