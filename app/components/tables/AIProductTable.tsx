import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { AIProducts } from "~/types";

interface AIProductTableProps {
  products: AIProducts;
}

const AIProductTable: FC<AIProductTableProps> = ({ products }) => {
  const [filters, setFilters] = useState({
    licence: "All",
    ecosystem: "All",
    category: "All",
    enterprise_categories: "All",
    name: "All",
    state: "All",
  });

  const filterProducts = () => {
    return products.filter(
      (product) =>
        (filters.licence === "All" || product.licence === filters.licence) &&
        (filters.ecosystem === "All" ||
          product.ecosystem === filters.ecosystem) &&
        (filters.category === "All" ||
          product.category.includes(filters.category)) &&
        (filters.enterprise_categories === "All" ||
          product.enterprise_categories.includes(
            filters.enterprise_categories
          )) &&
        (filters.name === "All" || product.name === filters.name) &&
        (filters.state === "All" || product.state === filters.state)
    );
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      [event.target.name as string]: event.target.value as string,
    });
  };

  return (
    <div className="mt-24">
      <div className="inline flex gap-4">
        <Select
          className="border border-top-nav-border !text-white bg-primary"
          name="licence"
          value={filters.licence}
          onChange={handleFilterChange}
        >
          <MenuItem className="" value="All">
            All
          </MenuItem>
          {/* Add other options here */}
        </Select>
        <Select
          className="border border-top-nav-border !text-white bg-primary"
          name="ecosystem"
          value={filters.ecosystem}
          onChange={handleFilterChange}
        >
          <MenuItem className="" value="All">
            All
          </MenuItem>
          {/* Add other options here */}
        </Select>
        {/* Add other filters here */}
      </div>
      <div className="w-[900px] h-[700px] border border-top-nav-border rounded overflow-auto !text-white mt-6">
        <TableContainer className="max-h-[700px]">
          <Table>
            <TableHead>
              <TableRow className="bg-primary font-montserrat">
                <TableCell className="!text-white-alt">Name</TableCell>
                <TableCell className="!text-white-alt">Ecosystem</TableCell>
                <TableCell className="!text-white-alt">License</TableCell>
                <TableCell className="!text-white-alt">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProducts().map((product) => (
                <TableRow key={product.id} className="bg-secondary font-nunito">
                  <TableCell className="!text-white-alt">
                    {product.name}
                  </TableCell>
                  <TableCell className="!text-white-alt">
                    {product.ecosystem}
                  </TableCell>
                  <TableCell className="!text-white-alt">
                    {product.licence}
                  </TableCell>
                  <TableCell>
                    <IconButton className="!p-0">
                      <Visibility className="!fill-white-alt" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AIProductTable;
