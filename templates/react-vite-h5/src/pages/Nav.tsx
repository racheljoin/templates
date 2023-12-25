import { Link, Outlet } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to={'/stateDemo'}>首页不验证</Link>
        <Link to={'/reduxDemo'}>redux demo需验证</Link>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Nav;
