// This displays the data for the table. Showing the wrestlers name and championships won.

export const WrestlerRows = ({wrestler, onSelect}: WrestlerRow) => (
    <tr>
        <td>{wrestler.name}</td>
        <td>{wrestler.championships
            .map((c) => `${c.title} (${c.times})`)
            .join(", ")}
        </td>
        <td>
            <button onClick={() => onSelect(wrestler)}>More Info</button>
        </td>
    </tr>

);


// Used for the onClick event to show more information about the wrestler.
export const WrestlerMoreInfo = ({ wrestler }: { wrestler: Wrestler }) => (
    <div>
        <h1>{wrestler.name}</h1>
        <p>{wrestler.description}</p>
    </div>
)

export interface WrestlerRow {
    wrestler: Wrestler;
    onSelect: (wrestler: Wrestler) => void;
};



export interface Wrestler {
    id: number;
    name: string;
    championships: Championship[];
    description: string;
};

export interface Championship {
    title: string;
    times: number;
};