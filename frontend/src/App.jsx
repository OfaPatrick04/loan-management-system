import { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import toast from "react-hot-toast";
import Loan from "./assets/Loan.jpg";
import { ReactTyped } from "react-typed";


function LoanForm() {
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    creditScore: "",
    debt: "",
    loanAmount: "",
    tenure: "",
  });
  const [result, setResult] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const stringTyped = [
    "Welcome to Loan Management System",
    "Evaluate your loan application",
    "Fill in the form and let's get started",
  ];

  const handleSubmit = async (e) => {
    toast.loading("Processing...", { id: "process" });
    e.preventDefault();
    const response = await fetch("https://loan-management-system-backend.vercel.app/api/evaluate-loan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResult(data.status);
    toast.dismiss("process");
    data.status.split(":")[0] === "Rejected"
      ? toast.error(data.status.split(":")[0])
      : toast.success(data.status.split(":")[0]);
  };

  return (
    <div className="lg:grid lg:grid-cols-2 px-3 lg:gap-4 pb-3 lg:px-8 lg:pb-8">
      <div className="hidden lg:grid grid-rows-3">
        <div className="row-span-1 flex items-center justify-center">
          {result ? (
            <Alert severity="info" sx={{ marginTop: 2 }}>
              {result}
            </Alert>
          ) : (
            <div className="text-3xl text-slate-900 font-semibold italic">
              <ReactTyped
                strings={stringTyped}
                typeSpeed={100}
                backSpeed={50}
                loop
              />
            </div>
          )}
        </div>
        <div className="row-span-2">
          <img className="w-full h-full object-cover rounded-md" src={Loan} />
        </div>
      </div>
      <div className="p-2">
        <div>
          <Typography variant="h4" gutterBottom align="center">
            Loan Evaluation Form
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 lg:gap-4"
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              type="number"
              required
            />
            <TextField
              fullWidth
              label="Credit Score"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              type="number"
              required
            />
            <TextField
              fullWidth
              label="Debt"
              name="debt"
              value={formData.debt}
              onChange={handleChange}
              type="number"
              required
            />
            <TextField
              fullWidth
              label="Loan Amount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              type="number"
              required
            />
            <TextField
              fullWidth
              label="Tenure (Years)"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              type="number"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Evaluate Loan
            </Button>
          </form>
          <div className="lg:hidden">
            {result && (
              <Alert severity="info" sx={{ marginTop: 2 }}>
                {result}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanForm;
