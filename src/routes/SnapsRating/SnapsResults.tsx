import CommonLink from '../../components/CommonLink';
import SubmitSnapsVote from '../../components/SubmitSnapsVote';

const SnapsResults = () => {
  return (
    <div className='flex flex-col h-full gap-y-8'>
      <SubmitSnapsVote />
      <CommonLink text="See the results!" to="results" />
    </div>
  );
};

export default SnapsResults;
