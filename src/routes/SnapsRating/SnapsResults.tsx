import { ReactNode } from 'react';
import CommonLink from '../../components/CommonLink';

const SnapsResults = () => {
    /**
     * TODO: Fetch the results from a DB and present them in the table
     */
  return (
    <div>
      <h2 className="my-2 text-4xl">Ratings</h2>
      <CommonLink text='Vote' to='submit'/>
      <table className="w-full text-sm text-black bg-white border border-collapse shadow-sm border-slate-400 dark:border-slate-500 dark:bg-slate-800 dark:text-white">
        <thead>
          <tr>
            <th className="px-6 text-xl border border-slate-600">Snaps</th>
            <th className="px-6 text-xl border border-slate-600">Smell</th>
            <th className="px-6 text-xl border border-slate-600">Taste</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableDataCell>Bäska droppar</TableDataCell>
            <TableDataCell>1</TableDataCell>
            <TableDataCell>3</TableDataCell>
          </tr>
          <tr>
            <TableDataCell>Gin</TableDataCell>
            <TableDataCell>3</TableDataCell>
            <TableDataCell>3</TableDataCell>
          </tr>
          <tr>
            <TableDataCell>Tonic</TableDataCell>
            <TableDataCell>4</TableDataCell>
            <TableDataCell>5</TableDataCell>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TableDataCell = ({ children }: { children: ReactNode }) => {
  return (
    <td className="px-2 py-1 text-lg text-center border border-slate-600">
      {children}
    </td>
  );
};

export default SnapsResults;
