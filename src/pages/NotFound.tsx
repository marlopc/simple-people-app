import { Link, useNavigate } from 'react-router-dom';
import ArrowBack from '../components/icons/ArrowBack';
import Warning from '../components/icons/Warning';
import '../styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main>
      <header className='route-header'>
        <button className='rounded' onClick={() => navigate('/')}>
          <ArrowBack />
        </button>
      </header>
      <div className='NotFound'>
        <h1>Page not found</h1>
        <figure>
          <Warning />
        </figure>
        <p>This page doesn't exists!</p>
        <Link to='/' className='NotFound-link'>
          Go to homepage
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
