import { NavLink, useMatch, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Race, useMutation, useQuery } from '../api';
import styles from './RaceIndex.module.css';
import Modal from '../components/Modal';
import RaceEditForm from './RaceEditForm';
import Panel from '../components/Panel';
import RaceNewForm from './RaceNewForm';
import { useCallback, useEffect } from 'react';

export default function RaceIndex() {
  const { raceId } = useParams();
  const { data: races = [], error, isLoading, refetch } = useQuery('get', '/races');
  const { mutate: deleteRace, isSuccess: wasDeleted } = useMutation('delete', '/races/{id}');
  const navigate = useNavigate();
  const isNew = !!useMatch('/races/new');
  const isIndex = !!useMatch('/');
  
  const onCloseEdit = () => {
    if (confirm("Discard changes?")) {
      navigate('/')
    }
  };

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
      <Modal onClose={onCloseEdit}>
        <RaceNewForm />
      </Modal>
    );
  } else if (raceId) {
    // Editing existing race
    modal = (
      <Modal onClose={onCloseEdit}>
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

  useEffect(() => {
    refetch();
  }, [wasDeleted]);

  const onClickDelete = useCallback((id: Race['id']) => {
    const race = races.find(race => race.id === id);
    const name = race?.name ?? 'untitled';
    if (confirm(`Are you sure you want to delete the ${name} race?`)) {
      deleteRace({ params: { path: { id: id.toString() } } });
    }
  }, [races]);

  return (
    <>
      {modal}

      <Panel className={classNames(styles.page, isLoading && styles.loading)}>
        <h1>Rēhi Race Management Software</h1>
        <p>Would you like to start a race? Click the button below.</p>
        <NavLink to="/races/new" className={styles.startButton}>Start New Race</NavLink>
        {races.length > 0 &&
          <table>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Competitors</th>
                <th>Finishers</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {races.map(race =>
                <tr key={race.id}>
                  <td><NavLink to={`/races/${race.id}`}>{raceIcon(race)}</NavLink></td>
                  <td><NavLink to={`/races/${race.id}`}>{race.id}</NavLink></td>
                  <td><NavLink to={`/races/${race.id}`}>{race.name}</NavLink></td>
                  <td><NavLink to={`/races/${race.id}`}>{race.lanes.filter(l => !!l.competitor).length}</NavLink></td>
                  <td><NavLink to={`/races/${race.id}`}>{race.lanes.filter(l => !!l.competitor?.position).length}</NavLink></td>
                  <td><NavLink to={`/races/${race.id}`}>{formatDateString(race.created_at)}</NavLink></td>
                  <td><button type="button" onClick={() => onClickDelete(race.id)}>🗑️</button></td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </Panel>
    </>
  );
}

function formatDateString(dateString: string): string {
  const date = new Date(Date.parse(dateString));
  if (isNaN(date.valueOf())) {
    return "";
  }
  return date.toLocaleString();
}

function raceIcon(race: Race): string {
  const isFinished = race.lanes.every(r => !!r.competitor?.position);
  const isStarted = race.lanes.some(r => !!r.competitor?.position);
  if (isFinished) {
    return '🥇';
  } else if (isStarted) {
    return '🏃';
  } else {
    return '⏱️';
  }
}
