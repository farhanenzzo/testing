import React from 'react';
import { HeartPulse, Link, Copy } from 'lucide-react';
import { ProteinData } from '../types/protein';
import ProteinStatus from './ProteinStatus';
import ProteinSequence from './ProteinSequence';

interface ProteinCardProps {
  protein: ProteinData;
}

const ProteinCard: React.FC<ProteinCardProps> = ({ protein }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-rose-50 p-1.5 rounded">
              <HeartPulse className="text-rose-500 w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {protein.hgene_name}
                </h2>
                <Link className="w-4 h-4 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-800">
                  {protein.tgene_name}
                </h2>
              </div>
              <div className="flex gap-2">
                <ProteinStatus 
                  isOutOfFrame={protein.isOutOfFrame}
                  isAnalyzed={protein.isAnalyzed}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {protein.seq_desc && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Sequence Analysis</h3>
            <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded-lg">{protein.seq_desc}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProteinSequence 
            title="Host Gene Sequence" 
            sequence={protein.hgene_seq} 
            geneName={protein.hgene_name}
          />
          <ProteinSequence 
            title="Target Gene Sequence" 
            sequence={protein.tgene_seq}
            geneName={protein.tgene_name}
          />
        </div>
      </div>
    </div>
  );
};

export default ProteinCard;