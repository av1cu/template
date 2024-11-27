import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import SelectForm from './Select';
import HandleStatus from '../utils/HandleStatus';

const TableItem = ({ rows, labels, ...props }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {labels.map((label, index) => (
                <TableCell align={index === 0 ? 'left' : 'right'}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((cell, index) => (
                  <TableCell align={index === 0 ? 'left' : 'right'}>
                    {index === row.length - 1 ? (
                      <HandleStatus cell={cell} />
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableItem;
