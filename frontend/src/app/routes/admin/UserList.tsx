import { useUsers } from "@/features/users/api/get-users";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
];

interface UserListProps {
  shouldFetch: boolean;
}

const UserList = ({ shouldFetch }: UserListProps) => {
  const { data, isFetching, error } = useUsers({
    queryConfig: {
      enabled: shouldFetch,
    },
  });

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
        width="100%"
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return <div>Failed to load data</div>;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      {data && (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default UserList;
