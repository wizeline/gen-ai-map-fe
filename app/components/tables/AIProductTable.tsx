/* eslint-disable @typescript-eslint/no-explicit-any */
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
  InputLabel,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { AIProducts } from "~/types";

interface AIProductTableProps {
  products: AIProducts;
  onViewDetails: (args?: any) => void;
}

const AIProductTable: FC<AIProductTableProps> = ({
  products,
  onViewDetails,
}) => {
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

  const categories = Array.from(
    new Set(
      products.reduce<string[]>(
        (acc, product) => [...acc, ...product.category],
        []
      )
    )
  );
  const ecosystems = Array.from(
    new Set(products.map((product) => product.ecosystem))
  );
  const licenses = Array.from(
    new Set(products.map((product) => product.licence))
  );
  const enterpriseCategories = Array.from(
    new Set(
      products.reduce<string[]>(
        (acc, product) => [...acc, ...product.enterprise_categories],
        []
      )
    )
  );

  const handleViewDetails = (productName: string) => {
    onViewDetails(productName);
  };

  return (
    <>
      <div className="inline-flex items-center gap-4 flex-wrap mt-24">
        <InputLabel id="category-label" className="!text-white">
          Category
        </InputLabel>
        <Select
          labelId="category-label"
          className="focus:outline-none focus:ring-0 border border-top-nav-border !text-white bg-primary select-arrow-color h-9"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="ecosystem-label" className="!text-white">
          AI Model
        </InputLabel>
        <Select
          labelId="ecosystem-label"
          className="focus:outline-none focus:ring-0 border border-top-nav-border !text-white bg-primary select-arrow-color h-9"
          name="ecosystem"
          value={filters.ecosystem}
          onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          {ecosystems.map((ecosystem) => (
            <MenuItem key={ecosystem} value={ecosystem}>
              {ecosystem}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="license-label" className="!text-white">
          License
        </InputLabel>
        <Select
          labelId="license-label"
          className="focus:outline-none focus:ring-0 border border-top-nav-border !text-white bg-primary select-arrow-color h-9"
          name="licence"
          value={filters.licence}
          onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          {licenses.map((license) => (
            <MenuItem key={license} value={license}>
              {license}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="enterprise_categories-label" className="!text-white">
          Industry
        </InputLabel>
        <Select
          labelId="enterprise_categories-label"
          className="focus:outline-none focus:ring-0 border border-top-nav-border !text-white bg-primary select-arrow-color h-9"
          name="enterprise_categories"
          value={filters.enterprise_categories}
          onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          {enterpriseCategories.map((enterpriseCategory) => (
            <MenuItem key={enterpriseCategory} value={enterpriseCategory}>
              {enterpriseCategory}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="mt-6">
        <div className="w-auto h-[700px] border border-top-nav-border rounded overflow-auto !text-white mt-6 items-center">
          <TableContainer className="max-h-[700px]">
            <Table stickyHeader>
              <TableHead>
                <TableRow className="bg-primary font-montserrat">
                  <TableCell className="!text-white-alt">Name</TableCell>
                  <TableCell className="!text-white-alt">Category</TableCell>
                  <TableCell className="!text-white-alt">AI Model</TableCell>
                  <TableCell className="!text-white-alt">License</TableCell>
                  <TableCell className="!text-white-alt">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterProducts().map((product) => (
                  <TableRow
                    key={product.id}
                    className="bg-secondary font-nunito"
                  >
                    <TableCell className="!text-white-alt">
                      {product.name}
                    </TableCell>
                    <TableCell className="!text-white-alt max-w-[350px]">
                      {product.category.join(", ")}
                    </TableCell>
                    <TableCell className="!text-white-alt">
                      {product.ecosystem}
                    </TableCell>
                    <TableCell className="!text-white-alt">
                      {product.licence}
                    </TableCell>
                    <TableCell className="!text-center">
                      <IconButton
                        className="!p-0"
                        onClick={() => handleViewDetails(product.name)}
                      >
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
    </>
  );
};

export default AIProductTable;
