
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";

const TaskTable = ({
  tasks,
  onMarkAsDone,
  onDownloadFile,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const getStatus = (deadline, status) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    if (status === "DONE") {
      return now > deadlineDate ? "Achieved" : "In Progress";
    } else {
      return now > deadlineDate ? "Failed" : "In Progress";
    }
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "22px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Deadline</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>
                <Tooltip title={task.title}>
                  <span
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {task.title}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ maxWidth: 250, overflow: "hidden" }}>
                <Tooltip title={task.description}>
                  <span
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {task.description}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                {formatDate(task.deadline)}
                <br />
                <code>{getStatus(task.deadline, task.status)}</code>
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                {task.status === "TODO" && (
                  <button onClick={() => onMarkAsDone(task._id)}>Done</button>
                )}
                {task.linkedFile && (
                  <button
                    onClick={() =>
                      onDownloadFile(
                        new Uint8Array(task.linkedFile.data.data),
                        task.linkedFile.contentType
                      )
                    }
                  >
                    Download
                  </button>
                )}
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;