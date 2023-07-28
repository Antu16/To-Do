export const todoListTableHeader = ["Image","Title", "Description","Status", "Actions"];

export const getAxiosHeaderObject = (access_token) => {
    return {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  };
