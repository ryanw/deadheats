import { NavLink, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useQuery } from '../api';
import styles from './RaceIndex.module.css';
import Modal from '../components/Modal';
import RaceForm from '../RaceForm';
import Panel from '../components/Panel';

export default function RaceIndex() {
  const { raceId } = useParams();
  const { data: races, error, isLoading } = useQuery('get', '/races');
  const navigate = useNavigate();

  let modal;
  if (raceId) {
    modal = (
      <Modal onClose={() => navigate('/')}>
        <RaceForm raceId={raceId} />
      </Modal>
    );
  }

  if (error) {
    modal = (
      <Modal onClose={() => navigate('/')}>
        There was an error: {error}
      </Modal>
    );
  }

  return (
    <Panel className={classNames(styles.page, isLoading && styles.loading)}>
      {modal}
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
  );
}
