// components/ContactForm.tsx
"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Heading from "../reusable-components/Heading";
import Button from "../reusable-components/Button";
import Paragraph from "../reusable-components/Paragraph";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { TextareaField } from "../reusable-components/CustomTextArea";
import InputField from "../ui/input";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <Heading className="text-3xl font-bold mb-8">Get in Touch</Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Name"
              icon={<FaUserAlt className="h-5 w-5 text-gray-400" />}
              className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="phone"
              type="number"
              placeholder="Phone"
              icon={<FaPhoneAlt className="h-5 w-5 text-gray-400" />}
              className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<MdEmail className="h-5 w-5 text-gray-400" />}
            className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          <TextareaField
            label="Messages"
            name="message"
            placeholder="Messages"
            icon={<FaUserAlt className="h-5 w-5 text-gray-400" />}
            className="border border-cyan-500 rounded pl-10 pr-3 py-1.5 w-full focus:outline-none"
            value={formData.message}
            onChange={handleChange}
          />

          <Button className="px-6 py-2 bg-gradient-to-r hover:cursor-pointer from-cyan-600 to-blue-700 text-white font-medium rounded-md hover:bg-green-800 transition">
            Submit Now
          </Button>
        </div>

        {/* Support Contact Info */}
        <div className="border rounded-lg p-6 space-y-6">
          <Heading className="text-lg font-semibold">Support Contact</Heading>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="text-green-700 w-6 h-6 mt-1" />
            <div>
              <Paragraph className="font-medium">Phone</Paragraph>
              <Paragraph className="text-sm">
                Mobile : <span className="font-semibold">(+88) 872-670-780</span>
              </Paragraph>
              <Paragraph className="text-sm">
                Mobile : <span className="font-semibold">(+88) 422-655-793</span>
              </Paragraph>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="text-green-700 w-6 h-6 mt-1" />
            <div>
              <Paragraph className="font-medium">Email</Paragraph>
              <Paragraph className="text-sm">Info@example.com</Paragraph>
              <Paragraph className="text-sm">Contact@example.com</Paragraph>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="text-green-700 w-6 h-6 mt-1" />
            <div>
              <Paragraph className="font-medium">Location</Paragraph>
              <Paragraph className="text-sm">
                Abbot Favicon Kinney, New York, USA - 25423
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
