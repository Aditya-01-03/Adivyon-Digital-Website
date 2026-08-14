import React from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { Card } from '@/components/ui/Card';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <h3 className="font-bold mb-2 break-words">Address</h3>
        <p className="text-body break-words">{COMPANY_INFO.address}</p>
      </Card>
      <Card className="overflow-hidden">
        <h3 className="font-bold mb-2 break-words">Email</h3>
        <p className="text-body break-words">{COMPANY_INFO.email}</p>
      </Card>
      <Card className="overflow-hidden">
        <h3 className="font-bold mb-2 break-words">Phone</h3>
        <p className="text-body break-words">{COMPANY_INFO.phone}</p>
      </Card>
    </div>
  );
}
