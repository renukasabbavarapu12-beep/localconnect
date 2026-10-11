import { useState } from 'react';
import { MapPin, Navigation, ChevronDown, Check, Loader2, AlertCircle } from 'lucide-react';
import { locations, getMandalsForDistrict, getVillagesForMandal, villageAliases, villageCoordinates } from '../data/locations';
import { useLocationContext } from '../context/LocationContext';

export default function LocationSelector({ compact = false }) {
  const { selectedLocation, setSelectedLocation, geoStatus, geoError, useMyLocation } = useLocationContext();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [applied, setApplied] = useState(false);

  const isGeoLoading = geoStatus === 'loading';

  const mandals = getMandalsForDistrict(selectedDistrict);
  const villages = getVillagesForMandal(selectedMandal);

  // Resolve an alternate village spelling to its canonical name.
  // Falls back to the value itself when no alias exists.
  function resolveVillage(v) {
    return villageAliases[v] || v;
  }

  // Build the label from whatever level the user has reached.
  // Always uses the canonical village name so cache keys stay consistent.
  function buildLabel(canonicalVillage) {
    if (canonicalVillage) return `${canonicalVillage}, ${selectedMandal}, ${selectedDistrict}`;
    if (selectedMandal)   return `${selectedMandal}, ${selectedDistrict}`;
    return selectedDistrict;
  }

  function handleApply() {
    const canonicalVillage = resolveVillage(selectedVillage);
    // Use stored coordinates when available — avoids a Nominatim geocode call.
    const storedCoords = canonicalVillage ? (villageCoordinates[canonicalVillage] || null) : null;
    setSelectedLocation({
      district: selectedDistrict,
      mandal:   selectedMandal,
      village:  canonicalVillage,
      label:    buildLabel(canonicalVillage),
      ...(storedCoords ? { coords: storedCoords } : {}),
    });
    setApplied(true);
  }

  // Reset the "applied" confirmation if the user changes their selection
  function handleDistrictChange(val) {
    setSelectedDistrict(val);
    setSelectedMandal('');
    setSelectedVillage('');
    setApplied(false);
  }

  function handleMandalChange(val) {
    setSelectedMandal(val);
    setSelectedVillage('');
    setApplied(false);
  }

  function handleVillageChange(val) {
    setSelectedVillage(val);
    setApplied(false);
  }

  const canApply = selectedDistrict && selectedMandal;

  return (
    <div className={`bg-white rounded-2xl shadow-card p-5 ${compact ? '' : 'sm:p-6'}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Current Location
          </p>
          <p className="text-sm font-bold text-slate-800">{selectedLocation.label}</p>
        </div>
      </div>

      {/* Use My Location button */}
      <button
        onClick={useMyLocation}
        disabled={isGeoLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all text-sm mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isGeoLoading
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <Navigation className="w-4 h-4" />}
        {isGeoLoading ? 'Detecting location…' : 'Use My Location'}
      </button>

      {/* Geolocation error */}
      {geoError && (
        <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{geoError}</span>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Select District
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 appearance-none cursor-pointer"
            >
              <option value="">Choose district...</option>
              {locations.districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {selectedDistrict && (
          <div className="animate-fade-in">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Select Mandal
            </label>
            <div className="relative">
              <select
                value={selectedMandal}
                onChange={(e) => handleMandalChange(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 appearance-none cursor-pointer"
              >
                <option value="">Choose mandal...</option>
                {mandals.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        )}

        {selectedMandal && villages.length > 0 && (
          <div className="animate-fade-in">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Select Village / Area
            </label>
            <div className="relative">
              <select
                value={selectedVillage}
                onChange={(e) => handleVillageChange(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 appearance-none cursor-pointer"
              >
                <option value="">Choose village...</option>
                {villages.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        )}

        {canApply && (
          <button
            onClick={handleApply}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all text-sm mt-1"
          >
            <Check className="w-4 h-4" />
            Apply Location
          </button>
        )}

        {applied && (
          <div className="flex items-center gap-2 text-sm text-accent-700 bg-accent-50 rounded-lg px-3 py-2.5 animate-fade-in">
            <Check className="w-4 h-4" />
            <span className="font-medium">Location set to {selectedLocation.label}</span>
          </div>
        )}
      </div>

    </div>
  );
}
