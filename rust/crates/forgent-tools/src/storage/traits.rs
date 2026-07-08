//! MemoryBackend trait for all storage backends.

use forgent_core::{ForgentAIError, RetrievalResult};
use serde_json::Value;

pub trait MemoryBackend: Send + Sync {
    fn backend_id(&self) -> &str;
    fn store(
        &self,
        content: &str,
        source: &str,
        metadata: Option<&Value>,
    ) -> Result<String, ForgentAIError>;
    fn retrieve(
        &self,
        query: &str,
        top_k: usize,
    ) -> Result<Vec<RetrievalResult>, ForgentAIError>;
    fn delete(&self, doc_id: &str) -> Result<bool, ForgentAIError>;
    fn clear(&self) -> Result<(), ForgentAIError>;
    fn count(&self) -> Result<usize, ForgentAIError>;
}
