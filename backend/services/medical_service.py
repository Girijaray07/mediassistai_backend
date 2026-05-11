from typing import Optional, List, Dict, Any
from db.session import get_db_connection
try:
    from rapidfuzz import fuzz, process
    RAPIDFUZZ_AVAILABLE = True
except ImportError:
    RAPIDFUZZ_AVAILABLE = False

class MedicalService:
    def __init__(self):
        self._conditions_cache: List[Dict[str, Any]] = []

    def _fetch_all_conditions(self) -> List[Dict[str, Any]]:
        """
        Fetches all medical conditions and their supplements from the database.
        """
        conn = None
        try:
            conn = get_db_connection()
            with conn.cursor() as cur:
                cur.execute("SELECT medical_condition, ayurvedic_supplements FROM medicine")
                rows = cur.fetchall()
                return [
                    {"condition": row[0], "supplements": row[1]}
                    for row in rows
                ]
        except Exception as e:
            print(f"Error fetching medical conditions: {e}")
            return []
        finally:
            if conn:
                conn.close()

    def get_supplements_from_query(self, query: str) -> Optional[Dict[str, Any]]:
        """
        Detects if any medical condition from the database exists in the user query.
        Uses case-insensitive matching and fuzzy matching if available.
        """
        conditions = self._fetch_all_conditions()
        if not conditions:
            return None

        query_lower = query.lower()
        
        # 1. Try exact substring matching first (case-insensitive)
        for entry in conditions:
            condition = entry["condition"].lower()
            if condition in query_lower:
                return entry

        # 2. Use RapidFuzz for partial matching if available
        if RAPIDFUZZ_AVAILABLE:
            threshold = 50
            for entry in conditions:
                condition = entry["condition"].lower()
                # partial_ratio is good for finding if the condition exists as a part of the query
                score = fuzz.token_set_ratio(query, condition)
                print(query_lower, condition, score)
                if score >= threshold:
                    print(f"Fuzzy match found: {condition} in query with score {score}")
                    return entry

        return None

medical_service = MedicalService()
