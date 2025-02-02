import { NavLink, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useQuery } from '../api';
import styles from './RaceIndex.module.css';
import Modal from '../components/Modal';
import RaceEditForm from './RaceEditForm';
import Panel from '../components/Panel';
import RaceNewForm from './RaceNewForm';
import { useEffect } from 'react';

export default function RaceIndex() {
  const { raceId } = useParams();
  const { data: races, error, isLoading, refetch } = useQuery('get', '/races');
  const navigate = useNavigate();
  const isNew = !!useMatch('/races/new');
  const isIndex = !!useMatch('/');

  // Refetch when navigating back to index
  useEffect(() => {
    if (isIndex) {
      refetch();
    }
  }, [isIndex]);

  let modal;
  if (isNew) {
    // Creating a new race
    modal = (
      <Modal onClose={() => navigate('/')}>
        <RaceNewForm />
      </Modal>
    );
  } else if (raceId) {
    // Editing existing race
    modal = (
      <Modal onClose={() => navigate('/')}>
        <RaceEditForm raceId={raceId} />
      </Modal>
    );
  } else if (error) {
    // Something bad happened
    modal = (
      <Modal onClose={() => navigate('/')}>
        There was an error: {error}
      </Modal>
    );
  }

  return (
    <>
      {modal}

      <Panel className={classNames(styles.page, isLoading && styles.loading)}>
        <NavLink to="/races/new">Start a Race</NavLink>
        <p>Previous races are below.</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Competitors</th>
              <th>Lanes</th>
            </tr>
          </thead>
          <tbody>
            {races?.map(race =>
              <tr key={race.id}>
                <td><NavLink to={`/races/${race.id}`}>{race.id}</NavLink></td>
                <td><NavLink to={`/races/${race.id}`}>{race.name}</NavLink></td>
                <td>{race.lanes.filter(l => !!l.competitor).length} competitors</td>
                <td>{race.lanes.length} lanes</td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
