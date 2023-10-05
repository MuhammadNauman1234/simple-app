"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "@/config/firebase";

function StudentsRecords() {
  const [studentRecords, setStudentRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const recordsRef = collection(db, "students");

  const getStudentsRecords = async () => {
    const data = await getDocs(recordsRef);
    const records = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setStudentRecords(records);
  };

  useEffect(() => {
    getStudentsRecords();
  }, [studentRecords]);

  const handleDeleteRecord = async (recordId) => {
    console.log(recordId);
    try {
      await deleteDoc(doc(db, "students", recordId));
      console.log("Record deleted successfully!");

      // Refresh the records after deletion
      const data = studentRecords.filter((record) => record.id !== recordId);
      setStudentRecords(data);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleEditRecord = (recordId) => {
    // Find the record to edit based on its ID
    const recordToEdit = studentRecords.find(
      (record) => record.id === recordId
    );
    // Set the record to edit in the state
    setEditingRecord(recordToEdit);
  };

  const handleUpdateRecord = async () => {
    try {
      // Update the Firestore document with the new data
      await updateDoc(doc(db, "students", editingRecord.id), {
        name: editingRecord.name, // Update with the actual fields you want to edit
        age: editingRecord.age,
        class: editingRecord.class,
        // ... add more fields as needed
      });

      console.log("Record updated successfully!");
      // Clear the editing state
      setEditingRecord(null);
      // Refresh the records after update
      getStudentsRecords();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      {/* Display Student Records Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Student Records</h2>

        <Link href="/">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer flex"
      >
        back to Home
      </button>
      </Link>


        {studentRecords.length > 0 && (
          <p className="text-green-500">
            Total Students: {studentRecords.length} records
          </p>
        )}

        <div>
          {editingRecord && (
            <div className="border border-gray-300 p-4 rounded-md mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Edit Student Record
              </h2>

              {/* Editable form for updating the record */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editingRecord.name}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Age:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editingRecord.age}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, age: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Class:
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editingRecord.class}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      class: e.target.value,
                    })
                  }
                />
              </div>

              <button
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
                onClick={handleUpdateRecord}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {studentRecords.length > 0 ? (
          <table className="min-w-full border border-gray-200">
            {/* Display table headers based on your CSV columns */}
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">Student Name</th>
                <th className="border border-gray-200 p-2">age</th>
                <th className="border border-gray-200 p-2">Class</th>
              </tr>
            </thead>
            {/* Display table data based on your CSV records */}
            <tbody>
              {studentRecords.map((record, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2">{record.name}</td>
                  <td className="border border-gray-200 p-2">{record.age}</td>
                  <td className="border border-gray-200 p-2">{record.class}</td>
                  <td className="border border-gray-200 p-2">
                    <button onClick={() => handleEditRecord(record.id)}>
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-200 p-2">
                    <button onClick={() => handleDeleteRecord(record.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student records available.</p>
        )}
      </div>
    </div>
  );
}

export default StudentsRecords;
