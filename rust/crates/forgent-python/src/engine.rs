//! PyO3 bindings for engine types.

use crate::core::PyMessage;
use forgent_engine::InferenceEngine;
use pyo3::prelude::*;

/// Wraps the Engine enum (static dispatch internally, opaque to Python).
#[pyclass(name = "Engine")]
pub struct PyEngine {
    pub inner: forgent_engine::Engine,
}

#[pymethods]
impl PyEngine {
    /// Create an engine by key (e.g. "ollama", "vllm", "sglang", "llamacpp",
    /// "mlx", "lmstudio", "exo", "nexa", "uzu", "apple_fm").
    #[new]
    #[pyo3(signature = (engine_key="ollama", host=None))]
    fn new(engine_key: &str, host: Option<&str>) -> PyResult<Self> {
        let engine = match engine_key {
            "ollama" => forgent_engine::Engine::Ollama(
                forgent_engine::OllamaEngine::new(
                    host.unwrap_or("http://localhost:11434"),
                    120.0,
                ),
            ),
            "vllm" => forgent_engine::Engine::Vllm(
                forgent_engine::OpenAICompatEngine::vllm(
                    host.unwrap_or("http://localhost:8000"),
                ),
            ),
            "sglang" => forgent_engine::Engine::Sglang(
                forgent_engine::OpenAICompatEngine::sglang(
                    host.unwrap_or("http://localhost:30000"),
                ),
            ),
            "llamacpp" => forgent_engine::Engine::LlamaCpp(
                forgent_engine::OpenAICompatEngine::llamacpp(
                    host.unwrap_or("http://localhost:8080"),
                ),
            ),
            "mlx" => forgent_engine::Engine::Mlx(
                forgent_engine::OpenAICompatEngine::mlx(
                    host.unwrap_or("http://localhost:8080"),
                ),
            ),
            "lmstudio" => forgent_engine::Engine::LmStudio(
                forgent_engine::OpenAICompatEngine::lmstudio(
                    host.unwrap_or("http://localhost:1234"),
                ),
            ),
            "exo" => forgent_engine::Engine::Exo(
                forgent_engine::OpenAICompatEngine::exo(
                    host.unwrap_or("http://localhost:52415"),
                ),
            ),
            "nexa" => forgent_engine::Engine::Nexa(
                forgent_engine::OpenAICompatEngine::nexa(
                    host.unwrap_or("http://localhost:18181"),
                ),
            ),
            "uzu" => forgent_engine::Engine::Uzu(
                forgent_engine::OpenAICompatEngine::uzu(
                    host.unwrap_or("http://localhost:8080"),
                ),
            ),
            "apple_fm" => forgent_engine::Engine::AppleFm(
                forgent_engine::OpenAICompatEngine::apple_fm(
                    host.unwrap_or("http://localhost:8079"),
                ),
            ),
            "vllm_native" => forgent_engine::Engine::VLLM(
                forgent_engine::VLLMEngine::new(
                    host.unwrap_or("http://localhost"),
                    8000,
                    None,
                    120.0,
                ),
            ),
            "sglang_native" => forgent_engine::Engine::SGLang(
                forgent_engine::SGLangEngine::new(
                    host.unwrap_or("http://localhost"),
                    30000,
                    120.0,
                ),
            ),
            "llamacpp_native" => forgent_engine::Engine::LlamaCppNative(
                forgent_engine::LlamaCppEngine::new(
                    host.unwrap_or("http://localhost"),
                    8080,
                    120.0,
                ),
            ),
            other => {
                return Err(PyErr::new::<pyo3::exceptions::PyValueError, _>(
                    format!("Unknown engine: {other}"),
                ));
            }
        };
        Ok(Self { inner: engine })
    }

    fn engine_id(&self) -> &str {
        self.inner.engine_id()
    }

    fn variant_key(&self) -> &str {
        self.inner.variant_key()
    }

    fn health(&self) -> bool {
        self.inner.health()
    }

    fn list_models(&self) -> PyResult<Vec<String>> {
        self.inner
            .list_models()
            .map_err(|e| PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(e.to_string()))
    }

    #[pyo3(signature = (messages, model, temperature=0.7, max_tokens=1024))]
    fn generate(
        &self,
        messages: Vec<PyMessage>,
        model: &str,
        temperature: f64,
        max_tokens: i64,
    ) -> PyResult<String> {
        let core_msgs: Vec<forgent_core::Message> =
            messages.iter().map(|m| m.to_core()).collect();
        let result = self
            .inner
            .generate(&core_msgs, model, temperature, max_tokens, None)
            .map_err(|e| PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(e.to_string()))?;
        Ok(serde_json::to_string(&result).unwrap_or_default())
    }

    fn __repr__(&self) -> String {
        format!("Engine({})", self.inner.variant_key())
    }
}

/// Convenience alias for backward compatibility.
#[pyclass(name = "OllamaEngine")]
pub struct PyOllamaEngine {
    inner: forgent_engine::OllamaEngine,
}

#[pymethods]
impl PyOllamaEngine {
    #[new]
    #[pyo3(signature = (host="http://localhost:11434", timeout=120.0))]
    fn new(host: &str, timeout: f64) -> Self {
        Self {
            inner: forgent_engine::OllamaEngine::new(host, timeout),
        }
    }

    fn engine_id(&self) -> &str {
        self.inner.engine_id()
    }

    fn health(&self) -> bool {
        self.inner.health()
    }

    fn list_models(&self) -> PyResult<Vec<String>> {
        self.inner
            .list_models()
            .map_err(|e| PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(e.to_string()))
    }

    #[pyo3(signature = (messages, model, temperature=0.7, max_tokens=1024))]
    fn generate(
        &self,
        messages: Vec<PyMessage>,
        model: &str,
        temperature: f64,
        max_tokens: i64,
    ) -> PyResult<String> {
        let core_msgs: Vec<forgent_core::Message> =
            messages.iter().map(|m| m.to_core()).collect();
        let result = self
            .inner
            .generate(&core_msgs, model, temperature, max_tokens, None)
            .map_err(|e| PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(e.to_string()))?;
        Ok(serde_json::to_string(&result).unwrap_or_default())
    }
}
