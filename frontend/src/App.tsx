import { useEffect } from 'react';
import styles from './App.module.css'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Modal from './components/Modal';
import RaceForm from './RaceForm';
import { useQuery, useMutation } from './api';

function App() {
  const navigate = useNavigate();
  const { raceId } = useParams();
  const { data: races, error, isLoading, refetch } = useQuery('get', '/races');
  const { mutate, status: saveStatus } = useMutation('post', '/races');
  let modal;
  if (raceId) {
    modal = (
      <Modal onClose={() => navigate("/")}>
        <RaceForm raceId={raceId} />
      </Modal>
    );
  }

  // Refetch records after a successful save
  useEffect(() => {
    if (saveStatus !== 'success') {
      return;
    }
    refetch();
  }, [saveStatus]);

  function onClick(_e: React.MouseEvent) {
    mutate({
      body: {
        race: {
          name: "Test Race",
          lanes: [
            { name: 'Lane 1' },
            { name: 'Lane 2', competitor: { name: "Test 1" } },
            { name: 'Lane 3', competitor: { name: "Test 2" } },
          ],
        }
      }
    });
  }

  return (
    <div className={styles.app}>
      <button type="button" onClick={onClick}>CLICK ME</button>
      {modal}
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {races &&
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
            {races.map(race =>
              <tr key={race.id}>
                <td><NavLink to={`/races/${race.id}`}>{race.id}</NavLink></td>
                <td><NavLink to={`/races/${race.id}`}>{race.name}</NavLink></td>
                <td>{race.lanes.filter(l => !!l.competitor).length} competitors</td>
                <td>{race.lanes.length} lanes</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default App
