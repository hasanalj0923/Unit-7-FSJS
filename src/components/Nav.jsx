import { NavLink } from 'react-router-dom';

const Nav = () => {
  const categories = ['cats', 'dogs', 'sunsets'];
  return (
    <nav className="main-nav" aria-label="Primary navigation">
      <ul>
        {categories.map((path) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === 'cats'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;