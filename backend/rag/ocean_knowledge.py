"""
FLOATX — Agentic Ocean Intelligence Platform
Oceanographic RAG Scientific Knowledge Base
"""

OCEAN_KNOWLEDGE_BASE = {
    "argo float": {
        "title": "ARGO Profiling Float",
        "definition": "An autonomous oceanographic instrument that drifts with deep ocean currents (typically at 1,000m depth) and periodically (every 10 days) descends to 2,000m before ascending to the surface, measuring temperature, salinity, and pressure profiles.",
        "specifications": "Equipped with CTD (Conductivity, Temperature, Depth) sensors. Transmits data via Iridium satellite constellation. Batteries last 4-5 years.",
        "data_frequency": "Standard 10-day cycle, 0-2000dbar profiles."
    },
    "thermocline": {
        "title": "Thermocline Layer",
        "definition": "The distinct vertical layer in a body of water in which temperature changes more rapidly with depth than it does in the layers above or below.",
        "ocean_relevance": "In the Indian Ocean, the thermocline typically extends between 50m and 500m depth. It separates the warm, well-mixed surface ocean from the cold deep abyssal waters."
    },
    "salinity": {
        "title": "Oceanic Salinity (PSU)",
        "definition": "The concentration of dissolved salts in seawater, expressed in Practical Salinity Units (PSU). 1 PSU is approximately equal to 1 gram of salt per kilogram of water.",
        "regional_contrast": "The Arabian Sea exhibits high salinity (>36 PSU) due to strong evaporation and minimal river influx. The Bay of Bengal has low salinity (<34 PSU) due to heavy precipitation and runoff from major rivers (Ganga, Brahmaputra, Irrawaddy)."
    },
    "arabian sea": {
        "title": "Arabian Sea Hydrography",
        "definition": "A northwestern region of the Indian Ocean bounded by India, Pakistan, Iran, the Arabian Peninsula, and the Horn of Africa.",
        "key_characteristics": "Exhibits intense monsoonal upwelling along the Somali coast and Oman, high surface salinity, and an extensive Oxygen Minimum Zone (OMZ) at intermediate depths (200-1000m)."
    },
    "bay of bengal": {
        "title": "Bay of Bengal Hydrography",
        "definition": "The northeastern part of the Indian Ocean, bounded by India, Bangladesh, Myanmar, and the Andaman & Nicobar Islands.",
        "key_characteristics": "Strong upper-ocean stratification caused by massive freshwater influx from rivers. Strong barrier layer formation inhibits deep thermal mixing, fueling intense tropical cyclone heat potential."
    },
    "depth profile": {
        "title": "Vertical Depth Profile",
        "definition": "A continuous graph or dataset representing oceanographic variables (temperature, salinity, density, dissolved oxygen) plotted against depth or hydrostatic pressure.",
        "scientific_utility": "Enables oceanographers to compute mixed layer depth (MLD), thermal capacity, geostrophic currents, and heat storage."
    }
}

def get_knowledge_entry(term: str) -> dict:
    term_lower = term.lower()
    for key, data in OCEAN_KNOWLEDGE_BASE.items():
        if key in term_lower or term_lower in key:
            return data
    return {
        "title": "ARGO Oceanography Reference",
        "definition": "The global ARGO array consists of nearly 4,000 active autonomous profiling floats measuring upper-ocean thermal and salinity structure.",
        "specifications": "Data is collected by National Oceanographic Data Centers (NODCs) and distributed via GDACs (Global Data Assembly Centers).",
        "data_frequency": "Standard 10-day cycles."
    }
