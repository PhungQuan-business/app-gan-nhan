from pathlib import Path


def test_project_root_exists() -> None:
    root = Path(__file__).resolve().parent.parent
    assert root.exists()
    assert (root / "package.json").exists()
