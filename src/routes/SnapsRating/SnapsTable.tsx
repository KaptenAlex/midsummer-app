import { ReactNode } from "react";
import CommonLink from "../../components/CommonLink";
import { useFetchSnapsRatings } from "../../hooks/useFetchSnapsRatings";

export const SnapsTable = () => {
    const snapsRatings = useFetchSnapsRatings();

    return (
        <div className="h-full">
            <CommonLink text="<-- Back to voting" to=".." />
            <h2 className="my-2 text-4xl text-blue-900">Ratings</h2>
            <table className="w-full text-sm text-yellow-500 bg-blue-900 border-2 border-collapse border-yellow-500 shadow-sm">
                <thead>
                    <tr>
                        <THCell>Snaps</THCell>
                        <THCell>Smell</THCell>
                        <THCell>Taste</THCell>
                        <THCell># of votes</THCell>
                    </tr>
                </thead>
                <tbody>
                    {snapsRatings.map((rating, i) => (
                        <tr key={i}>
                            <TDCell>{rating.snaps}</TDCell>
                            <TDCell>{rating.smell}</TDCell>
                            <TDCell>{rating.taste}</TDCell>
                            <TDCell>{rating.votes}</TDCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const TDCell = ({ children }: { children: ReactNode }) => {
    return (
        <td className="py-1 text-lg text-center capitalize border border-yellow-500">
            {children}
        </td>
    );
};

const THCell = ({ children }: { children: ReactNode }) => {
    return <th className="px-3 text-xl border border-yellow-500">{children}</th>;
};