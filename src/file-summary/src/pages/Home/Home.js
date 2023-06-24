import * as S from './Styled'
import * as React from 'react';
import {  TablePagination, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { IconButton } from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 2,align: 'center'},
  { id: 'code', label: 'ISO Code', minWidth: 2 ,align: 'center'},
  {
    id: 'population',
    label: 'Population',
    minWidth: 10,
    align: 'center',
    format: (value) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 10,
    align: 'center',
    format: (value) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 10,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('Brasil', 'BR', 1324171354, 3287263),
];

function Home() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (
      <S.Container>
        <div>
          <div>
            <S.Title>
              <IconButton >
                <AttachFileOutlinedIcon sx={{ fontSize: 40, color:'#fff' }}/>
              </IconButton>
              
              File Summary
            </S.Title>
          </div>

          <S.DivImport>
            <Stack direction="row" spacing={2}>
            
              <Button variant="contained" color="success" sx={{ borderRadius: '10px'}}>
              <IconButton>
                <FileUploadOutlinedIcon />
              </IconButton>
               Importar
              </Button>
            </Stack>
          </S.DivImport>
          
          <div>
            <Paper elevation={20} sx={{ padding: '1rem', margin: '10rem', borderRadius: '20px'}}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>

            
        </div>
      </S.Container>
    );
  };

export default Home;