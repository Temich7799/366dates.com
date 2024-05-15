import { TFunction } from "i18next";
import Table from "../../atoms/Table/Table"

type UsersTableProps = {
    data: any[];
    exclude?: Array<string>;
    additionalColumns?: {
        Header: string;
        accessor: string;
    }[];
    t: TFunction<string, undefined>
}

const UsersTable = ({ data, exclude, additionalColumns = [], t }: UsersTableProps) => {

    const columns = [
        { Header: t('name'), accessor: 'name' },
        { Header: t('month'), accessor: 'month_name' },
        { Header: t('day'), accessor: 'day' },
        { Header: t('city'), accessor: 'city' },
        { Header: t('language'), accessor: 'language' },
        { Header: t('foreign'), accessor: 'foreign' },
        { Header: t('another_foreign'), accessor: 'another_foreign' },
        { Header: t('notes'), accessor: 'note' },
        ...additionalColumns,
        { Header: 'ID', accessor: 'id' },
    ];

    const getFilteredColumns = () => columns.filter((column) => !exclude?.includes(column.accessor))

    return (
        <Table columns={exclude ? getFilteredColumns() : columns} data={data} />
    )
}

export default UsersTable;