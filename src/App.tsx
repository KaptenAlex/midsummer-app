import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrunkScoreboard from './routes/DrunkScoreboard';
import Error from './routes/Error';
import Home from './routes/Home';
import Layout from './routes/Layout';
import SnapsRating from './routes/SnapsRating/SnapsRating';
import SnapsvisorViewer from './routes/Snapsvisor/SnapsvisorViewer';
import SubmitSnapsvisa from './routes/Snapsvisor/SubmitSnapsvisa';
import Snapsvisor from './routes/Snapsvisor/Snapsvisor';
import SnapsResults from './routes/SnapsRating/SnapsResults';

/**
 * App should do four things
 * Vote for who will become the drunkest on midsummer
 * a rating system for the snaps
 * A collection of snapsvisor
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="drunk-scoreboard" element={<DrunkScoreboard />} />
          <Route path="snaps-rating" element={<SnapsRating />}>
            <Route index element={<SnapsResults />} />
          </Route>
          <Route path="snaps-visor" element={<Snapsvisor />}>
            <Route path="submit" element={<SubmitSnapsvisa />} />
            <Route index element={<SnapsvisorViewer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
