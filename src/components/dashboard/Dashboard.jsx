"use client";
// pages/dashboard.js
import React, { useState } from "react";
import CsvReader from "react-csv-reader"; // Assuming you have a CSV reader library
import { useRouter } from "next/navigation";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/config/firebase";
import Link from "next/link";

const Dashboard = () => {
  const [studentRecords, setStudentRecords] = useState([]);
  const router = useRouter();

  const handleFileUpload = (data, fileInfo) => {
    // Assuming your CSV data has a structure that you can work with
    setStudentRecords(data);
  };

  const recordsRef = collection(db, "students");

  const saveToDatabase = async () => {
    studentRecords.forEach(async (record) => {
      const addRecord = await addDoc(recordsRef, record);
      if(addRecord){
        router.push('/studentsrecords')
      }

    });

    console.log("Saving to Firestore:", studentRecords);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Student Records Dashboard</h1>
      <Link href="/studentsrecords">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer flex"
      >
        View All Students
      </button>
      </Link>
      {/* File Upload Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Import Student Records</h2>
        <CsvReader
          onFileLoaded={(data, fileInfo) => handleFileUpload(data, fileInfo)}
          parserOptions={{ header: true, skipEmptyLines: true }}
        />
        {studentRecords.length > 0 && (
          <p className="text-green-500">
            File Uploaded: {studentRecords.length} records
          </p>
        )}
      </div>

      {/* Display Student Records Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Student Records</h2>
        {studentRecords.length > 0 ? (
          <table className="min-w-full border border-gray-200">
            {/* Display table headers based on your CSV columns */}
            <thead>
              <tr>
                {Object.keys(studentRecords[0]).map((column) => (
                  <th key={column} className="border border-gray-200 p-2">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Display table data based on your CSV records */}
            <tbody>
              {studentRecords.map((record, index) => (
                <tr key={index}>
                  {Object.values(record).map((value, colIndex) => (
                    <td key={colIndex} className="border border-gray-200 p-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student records available.</p>
        )}
      </div>

      {/* Save to Firebase Button */}
      {studentRecords.length > 0 && (
        <button
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded cursor-pointer"
          onClick={saveToDatabase}
        >
          Save to Firebase
        </button>
      )}
    </div>
  );
};

export default Dashboard;
