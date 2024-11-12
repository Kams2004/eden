import React, { useEffect, useState } from 'react';
import './AccountantContainers.css';
import config from '../../../config';

export const AccountantTransactionsContainer = ({ doctorId }) => {
  const [commission, setCommission] = useState(null);

  useEffect(() => {
    if (doctorId) {
      fetch(`${config.baseURL}gnu_doctor/${doctorId}/research`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.commission !== undefined) {
            setCommission(data.commission);
          } else {
            setCommission(0);
          }
        })
        .catch((error) => console.error("Error fetching commission data:", error));
    }
  }, [doctorId]);

  return (
    <div className="accountant-small-container">
      <h3 className="container-title">Today's Commissions</h3>
      <div className="container-content">
        <i className="fas fa-wallet container-icon"></i>
        <span className="container-value">{commission !== null ? `${commission} CFA` : "Loading..."}</span>
      </div>
    </div>
  );
};

export const AccountantDoctorsContainer = () => {
  const [doctorCount, setDoctorCount] = useState(null);

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const response = await fetch(`${config.baseURL}doctor/nbr`);
        const data = await response.json();
        if (data && data.Nombre !== undefined) {
          setDoctorCount(data.Nombre);
        } else {
          setDoctorCount(0);
        }
      } catch (error) {
        console.error("Error fetching doctor count:", error);
        setDoctorCount(0);
      }
    };

    fetchDoctorCount();
  }, []);

  return (
    <div className="accountant-small-container">
      <h3 className="container-title">Doctors</h3>
      <div className="container-content">
        <i className="fas fa-user-md container-icon"></i>
        <span className="container-value">{doctorCount !== null ? doctorCount : "Loading..."}</span>
      </div>
    </div>
  );
};

export const AccountantPatientsContainer = ({ doctorId }) => {
  const [patientCount, setPatientCount] = useState(null);

  useEffect(() => {
    if (doctorId) {
      const fetchPatientCount = async () => {
        try {
          const response = await fetch(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
          const data = await response.json();
          if (data && data.data_patients) {
            setPatientCount(data.data_patients.length);
          } else {
            setPatientCount(0); // Default to 0 if no patients found
          }
        } catch (error) {
          console.error("Error fetching patient count:", error);
          setPatientCount(0);
        }
      };

      fetchPatientCount();
    }
  }, [doctorId]);

  return (
    <div className="accountant-small-container">
      <h3 className="container-title">Patients</h3>
      <div className="container-content">
        <i className="fas fa-user-injured container-icon"></i>
        <span className="container-value">{patientCount !== null ? patientCount : "Loading..."}</span>
      </div>
    </div>
  );
};